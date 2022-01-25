import { render, screen } from "@testing-library/react";
import ChattingItem from "./components/ChattingItem";

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
