export interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
}
