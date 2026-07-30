import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Comment from '@/lib/models/Comment';
import ArticleDetailClient from '@/components/ArticleDetailClient';

export const dynamic = 'force-dynamic';

async function getArticleData(id) {
  try {
    await dbConnect();
    let article = null;
    
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      article = await Article.findById(id);
    } else {
      article = await Article.findOne({ slug: id });
    }

    if (!article) {
      const { fallbackArticles } = require('@/lib/fallbacks');
      const matched = fallbackArticles.find(a => a._id === id || a.slug === id);
      return matched ? JSON.parse(JSON.stringify(matched)) : null;
    }

    article.views = (article.views || 0) + 1;
    await article.save();

    return JSON.parse(JSON.stringify(article));
  } catch (err) {
    console.error("Error loading article details on server:", err);
    const { fallbackArticles } = require('@/lib/fallbacks');
    const matched = fallbackArticles.find(a => a._id === id || a.slug === id);
    return matched ? JSON.parse(JSON.stringify(matched)) : null;
  }
}

async function getComments(articleId) {
  if (!articleId) return [];
  try {
    await dbConnect();
    const comments = await Comment.find({ entityId: articleId, isApproved: true }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(comments));
  } catch (err) {
    console.error("Error loading comments on server:", err);
    return [];
  }
}

export default async function ArticleDetailPage({ params }) {
  const { id } = params;

  const article = await getArticleData(id);

  if (!article) {
    notFound();
  }

  const comments = await getComments(article._id);

  return (
    <ArticleDetailClient 
      article={article} 
      initialComments={comments} 
      id={id} 
    />
  );
}
