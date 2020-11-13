import React, {useState, useEffect, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/auth-context";

function Home(): JSX.Element {
    let history = useHistory()
    const {state} = useContext(AuthContext);
    const [posts, setPosts] = useState<any>();
    const [author, setAuthor] = useState<string>('');

    const deletePost = async (id: string) => {
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/delete?postID=${id}`, {
            method: "delete",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
                "authorization": `Bearer ${state.token}`
            })
        });
        _removePostFromView(id);
        history.push('/');
    }

    const _removePostFromView = (id: string) => {
        const index = posts.findIndex((post: { _id: string; }) => post._id === id);
        posts.splice(index, 1);
    }

    useEffect(() => {
        const fetchPosts = async (): Promise<any> => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/posts`);
            const json = await response.json();
            setPosts(json)
        }
        if (state.token) {
            const fetchUser = async (): Promise<void> => {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/me`, {
                    method: "post",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "authorization": `Bearer ${state.token}`
                    }),
                });
                const json = await response.json();
                setAuthor(json.user);
            }
            fetchUser().then();
        }
        fetchPosts().then();
    },[state.token])

    return (
        <section className="blog-area section mt-5">
            <div className="container">
                <div className="row">
                    {posts && posts.map((post: { title: React.ReactNode; _id: any; author: any; }) => (
                        <div className="col-lg-4 col-md-6" key={post._id}>
                            <div className="card h-100">
                                <div className="single-post post-style-1">

                                    <div className="blog-image">
                                        <img
                                            src="https://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1563149789/blog-image_psvipq.jpg"
                                            alt="Blog"/>
                                    </div>

                                    <span className="avatar">
                    <img
                        src="http://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1513770253/WEB_FREAK_50PX-01_yaqxg7.png"
                        alt="User"/>
                  </span>

                                    <div className="blog-info">

                                        <h4 className="title">
                      <span>
                        <b>{post.title}</b>
                      </span>
                                        </h4>
                                    </div>
                                </div>

                                <ul className="post-footer">
                                    <li>
                                        <Link to={`/post/${post._id}`} className="btn btn-sm btn-outline-secondary">View
                                            Post </Link>
                                    </li>
                                    <li>
                                        {
                                            (author === post.author) &&
                                            state.isAuthenticated &&
                                            <Link to={`/edit/${post._id}`} className="btn btn-sm btn-outline-secondary">Edit
                                                Post </Link>
                                        }
                                    </li>
                                    <li>
                                        {
                                            (author === post.author) &&
                                            state.isAuthenticated &&
                                            <button className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => deletePost(post._id)}>Delete Post</button>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Home;