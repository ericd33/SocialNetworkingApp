import Post from "./Post";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { getPosts } from "../../Redux/actions";

export default function PostList() {
    const all_posts = useSelector((state) => state.filtered_posts);
    console.log(all_posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    },[dispatch])

    if (all_posts.length === 0) {
        return(
            <div>
                <h2>
                    Loading...
                </h2>
            </div>
        )
    }
    else {
        return (
            <div>
                {
                    all_posts.map((p) => {
                        return <Post author={p.author} likes={p.likes} comments={p.comments} text={p.content} image={p.image}/>
                    })
                }
            </div>
        )
    }
}