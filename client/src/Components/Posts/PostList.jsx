import Post from "./Post";
import { useEffect } from "react";
import { v4 } from 'uuid';
import "./PostList.css";
import { useUserAuth } from "../../context/UserAuthContext";
import axios from 'axios';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
export default function PostList() {
  const { user } = useUserAuth();
  let token = user.accessToken;
  const { ref, inView } = useInView();

  const fetchMoreData = async ({ pageParam = 0 }) => {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/paginate`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        page: pageParam,
      },
    };
    return axios(Config).then((res) => {
      return res.data.posts;
    });
  }

  const { data, status, error, isFetchingNextPage, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchMoreData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    }
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchMoreData, hasNextPage])

  if (error) {
    return <div>Error Loading posts</div>

  }


  return (
    <>
      <div id="post-container">
        {data?.pages.map((page) => {
          return page.map((p, index) => {
            return <div ref={((index + 1) === page.length) ? ref : undefined}><Post
              key={p._id || v4()}
              author={p.author}
              likes={p.likes}
              text={p.content}
              created={p.createdAt}
              comments={p.comments}
              image={p.image}
              id={p._id}
              enabled={p.enabled}
              disable={p.disable}
            />
            </div>
          })
        })}

        {(isFetching && !data) ? <br /> : null}

        {(isFetchingNextPage
          || (status === 'loading')
          || (isFetching && !data)
          || (isFetching && hasNextPage)
          || (isFetchingNextPage))
          && <div className="List">
            <div className="wrapper">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
              <div className="shadow"></div>
            </div>
          </div>
        }


      </div>
    </>
  );
}
