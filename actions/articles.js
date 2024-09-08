'use server'
import { revalidatePath } from 'next/cache';
import Article from '@/models/Article'

export const addArticle = async article => {
    console.log({ article })
    const title = article.get('title')
    const content = article.get('content')
    const category = article.get('category')
    console.log({ title,  content, category })

    const newArticle = new Article({ title,  content, category })
    // return newArticle.save() // why return?
    newArticle.save()
    revalidatePath('/');
}


export const getArticles = async () => {
    return Article.find()
}

export const deleteArticle = async id => {
    return Article.findByIdAndDelete(id)
}