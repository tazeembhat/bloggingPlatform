import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface BlogType {
    title: string,
    id: string,
    content: string,
    author :{
        name: string
    },
    postDate: string
}

export function useBlog({id}: {id: string}){

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogType>();
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setBlog(response.data);
            setLoading(false);
        })
    }, []);  

    return {
        loading,
        blog
    }
}

export function useBlogs(){
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/blogs/bulk`, {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setBlogs(response.data);
            setLoading(false); 
        })
    }, []);

    return {
        blogs,
        loading
    }
}

export function useMyBlogs(){
    const [loading, setLoading] = useState(true);
    const [myblogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/myblogs`, {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setBlogs(response.data);
            setLoading(false); 
        })
    }, []);

    return {
        myblogs,
        loading
    }
}