import { render } from '@testing-library/react';
import Tasks from '../components/tasks-list/Tasks';
import TasksService from '../services/tasks.service';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@contexts/auth/AuthProvider';

jest.mock('../services/tasks.service');


describe('Tasks component', () => {
    it('Should render tasks component', () => {
        const { baseElement } = render(
            <Router>
                <AuthProvider>
                    <Tasks />
                </AuthProvider>
            </Router>
        );
        expect(baseElement).toBeDefined();
    });

    it('Should fetch a list of tasks', async () => {
        (TasksService.list as jest.MockedFunction<typeof TasksService.list>)
            .mockImplementationOnce(() => Promise.resolve({
                success: true,
                response: {
                    docs: [],
                    total: 20,
                    page: 1,
                    pages: 2,
                    limit: 10
                },
                error: null
            }))

        const { findByText, baseElement } = render(
            <Router>
                <AuthProvider>
                    <Tasks />
                </AuthProvider>
            </Router>
        );
        await findByText(/No data to display/i);
        expect(baseElement).toMatchSnapshot();
    });

    it('Should show an error message if there was a problem fetching the tasks', async () => {
        (TasksService.list as jest.MockedFunction<typeof TasksService.list>)
            .mockImplementationOnce(() => Promise.resolve({
                success: false,
                error: { message: 'error', status: 500 },
                response: null
            }))

        const { findByText } = render(
            <Router>
                <AuthProvider>
                    <Tasks />
                </AuthProvider>
            </Router>
        );
        await findByText(/error/i);
    });

    it('Should create a task', async () => {
        (TasksService.save as jest.MockedFunction<typeof TasksService.save>)
            .mockImplementationOnce(() => Promise.resolve({
                success: true,
                response: {
                    _id: '',
                    title: '',
                    summary: '',
                    createdBy: undefined,
                    isPerformed: true,
                    performedAt: '',
                    createdAt: new Date()
                },
                error: null
            }))
    })
})
