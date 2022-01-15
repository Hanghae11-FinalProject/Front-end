import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChattingItem from "./components/ChattingItem";
import Login from "./pages/Login";

describe("LoginBtnRender", () => {
  it("should render LoginPage button", () => {
    render(<Login />);

    screen.getByRole("button");
  });
});

test("sample test", () => {
  const num1 = 10;
  const num2 = 20;
  expect(num1 + num2).toBe(30);
});

test.skip("check a nickname tag in ChattingItem", () => {
  const result = render(<ChattingItem />);
  const nicknameElement = result.container.querySelector(".nickname");
  expect(nicknameElement.tagName).toBe("H1");
});
