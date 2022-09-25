import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

export interface IBlogCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const BlogCard: FC<IBlogCardProps> = ({ id, createdAt, updatedAt, content, title }) => (
  <Card className="border-0">
    <CardBody className="p-0">
      <Link to={`/blogs/${id}`} style={{ textDecoration: 'none' }} className="text-primary">
        <h1>
          <strong>{title}</strong>
        </h1>

        <div dangerouslySetInnerHTML={{ __html: content.substring(0, 250) }} className="pl-1" />

        <br />
      </Link>
      {createdAt !== updatedAt ? (
        <p className="pl-1">Updated at {new Date(updatedAt).toLocaleString()}</p>
      ) : (
        <p className="pl-1">Posted at {new Date(createdAt).toLocaleString()}</p>
      )}
    </CardBody>
  </Card>
);
