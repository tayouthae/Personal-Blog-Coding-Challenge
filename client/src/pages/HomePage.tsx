import React, { useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'reactstrap';
import IBlog from '../interfaces/blog';
import { Loader, Header, BlogCard } from '../components';
import 'react-toastify/dist/ReactToastify.css';

const HomePage: FC = () => {
  const [blogs, setBlogs] = useState<IBlog[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const getAllBlogs = async () => {
    await axios
      .get('/')
      .then((response) => {
        if (response.status === (200 || 304)) {
          const getBlogs = response.data.blogs as IBlog[];
          getBlogs.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));

          setBlogs(getBlogs);
        } else {
          setError('Unable to retrieve blogs');
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    toast(error, { position: 'bottom-right', type: 'error' });
  }

  return (
    <Container fluid className="p-0">
      <Header title="Personal Blog Coding Challenge" />
      <Container className="mt-5">
        {blogs?.length === 0 ? (
          <p>
            There are no blogs yet. You should <Link to="/edit">post</Link> one.
          </p>
        ) : (
          blogs?.map((blog) => (
            <div key={blog?._id}>
              <BlogCard
                id={blog._id}
                title={blog.title}
                content={blog.content}
                createdAt={blog.createdAt}
                updatedAt={blog.updatedAt}
              />
              <hr />
            </div>
          ))
        )}

        <ToastContainer />
      </Container>
    </Container>
  );
};

export default HomePage;
