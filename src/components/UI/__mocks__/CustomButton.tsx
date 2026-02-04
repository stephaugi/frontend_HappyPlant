import App from '@/app/(tabs)/index';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from '../CustomButton';

describe('Clicking on moisture level button and rendering app', () => {
  it('calls the onPress function when clicked', () => {
    // 1. Create a mock function
    const mockOnPress = jest.fn();

    // 2. Render the component, passing the mock function as a prop
    render(<CustomButton onPress={mockOnPress} label="Click Me" />);

    // 3. Find the button element
    // You can use getByTestId, getByText, or getByRole
    // const buttonElement = screen.getByTestId('my-button');
    const buttonElement = screen.getByText('Click Me'); 

    // 4. Simulate the press event
    fireEvent.press(buttonElement);

    // 5. Assert that the mock function was called
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
  // test('liking then unliking messages correctly decreases the count of likes', () => {
  //   // Arrange
  //   const { container } = render(<App />);
  //   let buttons = container.querySelectorAll('button.like');

  //   // Act
  //   // Activate 3 likes
  //   fireEvent.click(buttons[0]);
  //   fireEvent.click(buttons[1]);
  //   fireEvent.click(buttons[10]);

  //   // Deactivate 2 likes
  //   fireEvent.click(buttons[0]);
  //   fireEvent.click(buttons[1]);

  //   // Assert
  //   const likeCountText = screen.getByText(/1 ❤️s/);
  //   expect(likeCountText).not.toBeNull();
  // });

  // test('clicking button toggles heart and does not affect other buttons', () => {
  //   // Arrange
  //   const { container } = render(<App />);
  //   const buttons = container.querySelectorAll('button.like');
  //   const firstButton = buttons[0];
  //   const lastButton = buttons[buttons.length - 1];

  //   // Act-Assert

  //   // click the first button
  //   fireEvent.click(firstButton);
  //   expect(firstButton.innerHTML).toEqual('❤️');

  //   // check that all other buttons haven't changed
  //   for (let i = 1; i < buttons.length; i++) {
  //     expect(buttons[i].innerHTML).toEqual('🤍');
  //   }

  //   // click the first button a few more times
  //   fireEvent.click(firstButton);
  //   expect(firstButton.innerHTML).toEqual('🤍');
  //   fireEvent.click(firstButton);
  //   expect(firstButton.innerHTML).toEqual('❤️');
  //   fireEvent.click(firstButton);
  //   expect(firstButton.innerHTML).toEqual('🤍');

  //   // click the last button a couple times
  //   fireEvent.click(lastButton);
  //   expect(lastButton.innerHTML).toEqual('❤️');
  //   fireEvent.click(lastButton);
  //   expect(lastButton.innerHTML).toEqual('🤍');
  // });
});
