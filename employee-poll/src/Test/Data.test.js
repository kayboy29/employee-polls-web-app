const { _saveQuestionAnswer, _saveQuestion } = require("../data/_DATA");

describe("_saveQuestion()", () => {
  it("should return formatted question when correctly data", async () => {
    const author = "sarahedo";
    const optionOneText = "This is option one";
    const optionTwoText = "This is option two";

    const question = {
      author: "sarahedo",
      optionOneText: "This is option one",
      optionTwoText: "This is option two",
    };

    const expectation = {
      author: author,
      optionOne: {
        text: optionOneText,
      },
      optionTwo: {
        text: optionTwoText,
      },
    };
    await expect(_saveQuestion(question)).resolves.toMatchObject(expectation);
  });

  it("will return an error when incorrect data", async () => {
    const question = {
      author: "sarahedo",
      optionTwoText: "This is option two",
    };
    await expect(await _saveQuestion(question).catch((e) => e)).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return true when correctly formatted data", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    });
    expect(response).toBeTruthy();
  });

  it("should return error when incorrect data", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: undefined,
      answer: "optionOne",
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
