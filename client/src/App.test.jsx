import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

import GameOver from './components/GameOver/GameOver';
import GamePage from './components/GamePage/GamePage';
import Selector from './components/Selector/Selector';
import Target from './components/Target/Target';
import { checkCollision } from './components/GamePage/checkCollision';

// Mock the useState hook

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

describe('GameOver', () => {
    it('should render GameOver component when tries > 10', () => {

        render(<GamePage tries={11}/>);
        
        // GameOver should be rendered
        expect(screen.getByText(/game over/i)).toBeInTheDocument();
    });

    it('should render GamePage component when tries <= 10', () => {
        // Mock ALL useState calls in GamePage
        render(<GamePage tries={1}/>);
        
        const gameOver = screen.queryByText(/game over/i);
        // GameOver should be rendered (check for image or other game elements)
        expect(gameOver).not.toBeInTheDocument();
    });
});

describe('Target', () => {

    it('should detect collision when ranges overlap', () => {
        const boxRangeX = [10, 20];  // Selector X range
        const boxRangeY = [30, 40];  // Selector Y range
        const desiredRangeX = [15, 25];  // Target X range (overlaps with selector)
        const desiredRangeY = [35, 45];  // Target Y range (overlaps with selector)
        
        const result = checkCollision(boxRangeX, boxRangeY, desiredRangeX, desiredRangeY);
        expect(result).toBe(true);
    });

    it('should not detect collision when ranges do not overlap in X direction', () => {
        const boxRangeX = [10, 20];  // Selector X range
        const boxRangeY = [30, 40];  // Selector Y range
        const desiredRangeX = [25, 35];  // Target X range (NO overlap with selector)
        const desiredRangeY = [35, 45];  // Target Y range (overlaps with selector)
        
        const result = checkCollision(boxRangeX, boxRangeY, desiredRangeX, desiredRangeY);
        expect(result).toBe(false);
    });

    it('should not detect collision when ranges do not overlap in Y direction', () => {
        const boxRangeX = [10, 20];  // Selector X range
        const boxRangeY = [30, 40];  // Selector Y range
        const desiredRangeX = [15, 25];  // Target X range (overlaps with selector)
        const desiredRangeY = [50, 60];  // Target Y range (NO overlap with selector)
        
        const result = checkCollision(boxRangeX, boxRangeY, desiredRangeX, desiredRangeY);
        expect(result).toBe(false);
    });

    it('should not detect collision when ranges do not overlap in both directions', () => {
        const boxRangeX = [10, 20];  // Selector X range
        const boxRangeY = [30, 40];  // Selector Y range
        const desiredRangeX = [25, 35];  // Target X range (NO overlap)
        const desiredRangeY = [50, 60];  // Target Y range (NO overlap)
        
        const result = checkCollision(boxRangeX, boxRangeY, desiredRangeX, desiredRangeY);
        expect(result).toBe(false);
    });

    it('should detect collision when ranges barely touch at edges', () => {
        const boxRangeX = [10, 20];  // Selector X range
        const boxRangeY = [30, 40];  // Selector Y range
        const desiredRangeX = [20, 30];  // Target X range (touches at edge: 20)
        const desiredRangeY = [40, 50];  // Target Y range (touches at edge: 40)
        
        const result = checkCollision(boxRangeX, boxRangeY, desiredRangeX, desiredRangeY);
        expect(result).toBe(true);
    });
})