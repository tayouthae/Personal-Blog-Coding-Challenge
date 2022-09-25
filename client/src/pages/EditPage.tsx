import React, { useEffect, useState, FC } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Link, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Loader, Header } from '../components';

const EditPage: FC = () => {
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [picture, setPicture] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { blogID } = useParams();

  const getBlog = async (getBlogId: string) => {
    await axios
      .get(`/read/${getBlogId}`)
      .then((response) => {
        if (response.status === (200 || 304)) {
          setTitle(response.data.blog.title);
          setContent(response.data.blog.content);
          setPicture(response.data.blog.picture || '');

          /** Convert html string to draft JS */
          const contentBlock = htmlToDraft(response.data.blog.content);
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorStateBlog = EditorState.createWithContent(contentState);

          setEditorState(editorStateBlog);
        } else {
          setError(`Unable to retrieve blog ${getBlogId}`);
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
    if (blogID) {
      setId(blogID);
      getBlog(blogID);
    } else {
      setLoading(false);
    }
  }, []);

  const editBlog = async () => {
    if (title === '' || content === '') {
      setError('Please fill out all fields.');
      setSuccess('');
      return null;
    }

    setError('');
    setSuccess('');
    setSaving(true);

    await axios
      .patch(`/update/${blogID}`, {
        title,
        picture,

        content,
      })
      .then((response) => {
        if (response.status === 201) {
          setSuccess('Blog updated.');
        } else {
          setError(`Unable to save blog.`);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setSaving(false);
      });
    return null;
  };

  if (loading) return <Loader />;

  if (success) toast(success, { position: 'bottom-right', type: 'success' });

  if (error) toast(error, { position: 'bottom-right', type: 'error' });

  return (
    <Container fluid className="p-0">
      <Header
        image="https://startbootstrap.github.io/startbootstrap-clean-blog/img/home-bg.jpg"
        title={id !== '' ? 'Edit Your Blog' : 'Create a Blog'}
      />
      <Container className="mt-5 mb-5">
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={title}
              id="title"
              placeholder="Enter a title"
              disabled={saving}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="picture">Picture URL</Label>
            <Input
              type="text"
              name="picture"
              value={picture}
              id="picture"
              placeholder="Picture URL"
              disabled={saving}
              onChange={(event) => {
                setPicture(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <Editor
              editorState={editorState}
              wrapperClassName="card"
              editorClassName="card-body"
              onEditorStateChange={(newState) => {
                setEditorState(newState);
                setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
              }}
              toolbar={{
                options: [
                  'inline',
                  'blockType',
                  'fontSize',
                  'list',
                  'textAlign',
                  'history',
                  'embedded',
                  'emoji',
                  'image',
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
          </FormGroup>

          <FormGroup>
            <Button
              block
              onClick={() => {
                editBlog();
              }}
              disabled={saving}
            >
              <i className="fas fa-save mr-1" />
              {id !== '' ? 'Update' : 'Post'}
            </Button>
            {id !== '' && (
              <Button block color="success" tag={Link} to={`/blogs/${id}`}>
                Go to your blog post!
              </Button>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Preview</Label>
            <div className="border ql-container p-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>
          </FormGroup>
        </Form>

        <ToastContainer />
      </Container>
    </Container>
  );
};

export default EditPage;
