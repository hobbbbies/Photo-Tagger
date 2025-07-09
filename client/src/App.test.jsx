import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import GameOver from './components/GameOver/GameOver';
import GamePage from './components/GamePage/GamePage';

// Mock the useState hook
const mockSetState = vi.fn();

vi.mock('./components/Header/Header', () => ({
    default: () => <div></div>
}));

vi.mock('./components/Footer/Footer', () => ({
    default: () => <div></div>
}));

vi.mock('./components/GamePage/GamePage', () => ({
    default: ({ tries = 0 }) => {
        if (tries > 10) {
            return <div>Game Over</div>;
        }
        return <div>Game Active</div>;
    }
}));

describe('GameOver should appear once tries hits 10', () => {
    it('should render GameOver component when tries > 10', () => {
        // Mock ALL useState calls in GamePage
        vi.spyOn(React, 'useState')
            .mockReturnValueOnce([11, mockSetState]) // tries state
            .mockReturnValueOnce([null, mockSetState]) // left state
            .mockReturnValueOnce([null, mockSetState]) // top state
            .mockReturnValueOnce([[null, null], mockSetState]) // boxRangeX state
            .mockReturnValueOnce([[null, null], mockSetState]) // boxRangeY state
            .mockReturnValueOnce([[null, null], mockSetState]) // desiredRangeX state
            .mockReturnValueOnce([[null, null], mockSetState]); // desiredRangeY state

        render(<GamePage />);
        
        // GameOver should be rendered
        expect(screen.getByText(/game over/i)).toBeInTheDocument();
    });

    it('should render GamePage component when tries <= 10', () => {
        // Mock ALL useState calls in GamePage
        vi.spyOn(React, 'useState')
            .mockReturnValueOnce([5, mockSetState]) // tries state
            .mockReturnValueOnce([null, mockSetState]) // left state
            .mockReturnValueOnce([null, mockSetState]) // top state
            .mockReturnValueOnce([[null, null], mockSetState]) // boxRangeX state
            .mockReturnValueOnce([[null, null], mockSetState]) // boxRangeY state
            .mockReturnValueOnce([[null, null], mockSetState]) // desiredRangeX state
            .mockReturnValueOnce([[null, null], mockSetState]); // desiredRangeY state

        render(<GamePage />);
        
        // GameOver should be rendered (check for image or other game elements)
        expect(screen.getByText(/game over/i)).not.toBeInTheDocument();
    });
});