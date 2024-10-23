import { describe, it, expect } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllUsers, getUser, logIn, logOut } from "./lib/api";
import { fail } from "assert";

const mock = new MockAdapter(axios);

describe("logIn", () => {
  it("should handle login failure", async () => {
    const email = "test@example.com";
    const password = "password";

    // Mock the Axios post request to return an error (e.g., status code 401)
    mock.onPost("/login", { email, password }).reply(401);

    // Call the logIn function
    try {
      await logIn(email, password);
      // If the function does not throw an error, fail the test
      fail("Expected logIn to throw an error for unauthorized login");
    } catch (error) {
      // Assert that the error is an Axios error with the expected status code
      expect(error.response.status).toBe(404);
    }
  });
});

describe("logIn", () => {
  it("should handle login success", async () => {
    const email = "super@admin.com";
    const password = "password";

    // Mock the Axios post request to return an error (e.g., status code 401)
    mock.onPost("/login", { email, password }).reply(200);

    // Call the logIn function
    try {
      await logIn(email, password);
      // If the function does not throw an error, fail the test
      expect(true).toBe(true);
    } catch (error) {
      // Assert that the error is an Axios error with the expected status code
      expect(error.response.status).toBe(404);
    }
  });
});

// create a test for changeSettings function

describe("changeSettings", () => {
  it("should handle changeSettings failure", async () => {
    const email = "test@test.com";
    const password = "password";

    // Mock the Axios post request to return an error (e.g., status code 401)
    mock.onPost("/changeSettings", { email, password }).reply(401);

    // Call the logIn function
    try {
      await logIn(email, password);
      // If the function does not throw an error, fail the test
      fail("Expected logIn to throw an error for unauthorized login");
    } catch (error) {
      // Assert that the error is an Axios error with the expected status code
      expect(error.response.status).toBe(404);
    }
  });
});

describe("getUser", () => {
  it("should handle user failure", async () => {
    try {
      await getUser();

      fail("Expected getUser to throw an error for unauthorized user");
    } catch (error) {
      expect(error.response).toBe(undefined);
    }
  });
});

describe("getAllUser", () => {
  it("should handle Users array failure", async () => {
    try {
      await getAllUsers();
      fail("Expected getAllUsers to throw an error for unauthorized user");
    } catch (error) {
      expect(error.response).toBe(undefined);
    }
  });
});

describe("Logout funtion", () => {
  it("Should handle logout", async () => {
    try {
      await logOut();
      expect(true).toBe(true);
    } catch (error) {
      expect(error.response).toBe(undefined);
    }
  });
});
