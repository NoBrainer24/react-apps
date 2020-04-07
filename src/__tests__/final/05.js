// mocking HTTP requests
// http://localhost:3000/login-submission
import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login-submission'

test('submitting the form makes a POST to /login and redirects the user to /app', async () => {
  const fakeResponse = Promise.resolve({token: 'fake-token'})
  window.fetch.mockResolvedValueOnce({
    json: () => fakeResponse,
  })
  render(<Login />)
  const username = 'chucknorris'
  const password = 'i need no password'

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByText(/submit/i))

  await screen.findByLabelText(/loading/i)

  expect(window.fetch).toHaveBeenCalledWith('/api/login', {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {'content-type': 'application/json'},
  })
  expect(window.fetch).toHaveBeenCalledTimes(1)
})
