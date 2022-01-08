import { render, screen } from '@testing-library/react';
import ChattingItem from "./components/ChattingItem";

test('check a nickname tag in ChattingItem', () => {
  const result = render(<ChattingItem />);
  const nicknameElement = result.container.querySelector(".nickname")
  expect(nicknameElement.tagName).toBe("H1");
});
