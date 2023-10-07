import { describe, expect, it } from 'vitest'
import { GetImages } from '../src/services'

describe('GetImages', () => {
  it('should return an array of images with their ids and data', async () => {
    // Arrange
    // Mock the necessary dependencies and setup the necessary data for the test

    // Act
    const result = await GetImages()

    // Assert
    // Assert that the result is an array
    expect(Array.isArray(result)).toBe(true)

    // Assert that each item in the result array has an id and data property
    result.forEach((item) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('data')
    })
  })
})
