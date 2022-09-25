import axios from 'axios';
import React, { useEffect, useState, FC } from 'react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Loader, Header } from '../components';
import 'react-toastify/dist/ReactToastify.css';
import IBlog from '../interfaces/blog';

const BlogPage: FC = () => {
  const [id, setId] = useState<string>('');
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [modal, setModal] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const navigate = useNavigate();

  const { blogID } = useParams();

  useEffect(() => {
    if (blogID) {
      setId(blogID);
    } else {
      navigate('/');
    }
  }, []);

  const getBlog = async () => {
    await axios
      .get(`/read/${id}`)
      .then((response) => {
        if (response.status === (200 || 304)) {
          setBlog(response.data.blog);
        } else {
          setError(`Unable to retrieve blog ${id}`);
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
    if (id !== '') getBlog();
  }, [id]);

  const deleteBlog = async () => {
    setDeleting(true);

    await axios
      .delete(`/${id}`)
      .then((response) => {
        if (response.status === 201) {
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          setError(`Unable to retrieve blog ${id}`);
          setDeleting(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setDeleting(false);
      });
  };

  if (loading) return <Loader />;
  if (error) {
    toast(error, { position: 'bottom-right', type: 'error' });
  }

  if (blog) {
    return (
      <Container fluid className="p-0">
        <Modal isOpen={modal}>
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>{deleting ? <Loader /> : 'Are you sure you want to delete this blog?'}</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => deleteBlog()}>
              Delete Permanently
            </Button>
            <Button color="secondary" onClick={() => setModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Header image={blog.picture || undefined} title={blog.title}>
          <p className="text-white">Posted on {new Date(blog.createdAt).toLocaleString()}</p>
        </Header>
        <Container className="mt-5">
          <Container fluid className="p-0">
            {blog && (
              <Button color="info" className="mr-2" tag={Link} to={`/edit/${blog?._id}`}>
                <i className="fas fa-edit mr-2" />
                Edit
              </Button>
            )}
            <Button color="danger" onClick={() => setModal(true)}>
              <i className="far fa-trash-alt mr-2" />
              Delete
            </Button>
            <hr />
          </Container>
          {/*  eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Container>
        <ToastContainer />
      </Container>
    );
  }

  return <Navigate to="/" />;
};

export default BlogPage;
