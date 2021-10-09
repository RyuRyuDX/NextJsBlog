import Link from 'next/link';
import React from 'react';
import { styled } from '@stitches/react';


const Home = ({blogs}) => {
  return (
    <div>
      <h2>記事一覧</h2>
      <Button>Button</Button>

      <div>
        {blogs.map(blog => (
          <React.Fragment key={blog.id}>
            <Link href="/blogs/[id]" as={`blogs/${blog.id}`}>
              <a>
                <h2>{blog.title}</h2>
              </a>
            </Link>
            {blog.tags.map(tag => (
              <React.Fragment key={tag.id}>
                <span>{tag.name}</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const res = await fetch(
    `https://ruru.microcms.io/api/v1/blogs/`,
    key,
  );
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    }
  }
};

const Button = styled('button', {
  backgroundColor: 'red',
  borderRadius: '9999px',
  fontSize: '13px',
  padding: '10px 15px',
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});

export default Home;