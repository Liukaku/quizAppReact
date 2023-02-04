import React from "react";

const AddQuestion = () => {
  return (
    <form className="flex flex-wrap">
      <input
        className="w-full"
        type="text"
        id="questionTitle"
        placeholder="Enter your question here..."
      />
      <div className="w-3/12 mx-auto">
        <div>
          <input type={"radio"} id="single" value={"Single Choice"}></input>
          <label htmlFor="single">Single Choice</label>
        </div>
        <div>
          <input type={"radio"} id="multi" value={"Multiple Choice"}></input>
          <label htmlFor="multi">Multiple Choice</label>
        </div>
        <div>
          <input type={"radio"} id="reorder" value={"Re-order"}></input>
          <label htmlFor="reorder">Re-Order</label>
        </div>
      </div>
    </form>
  );
};

export default AddQuestion;
