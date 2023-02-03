import { GetServerSideProps } from "next/types";
import React, { useEffect } from "react";

const QuizPage = ({ ...props }) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return <div>{props.path}</div>;
};

export default QuizPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query.id);
  return {
    props: {
      path: context.query.id,
    },
  };
};
