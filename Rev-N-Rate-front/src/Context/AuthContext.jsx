/* eslint-disable */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });
  const [userId, setUserId] = useState(() => {
    return JSON.parse(sessionStorage.getItem("userId")) || null;
  });
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewerDetails, setReviewerDetails] = useState(null);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }

    if (userId) {
      sessionStorage.setItem("userId", JSON.stringify(userId));
    } else {
      sessionStorage.removeItem("userId");
    }
  }, [user, userId]);

  const register = async (email, username, password, phone) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          email,
          username,
          password,
          phone,
        }
      );
      setUser(response.data.data);
      setUserId(response.data.data.id);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        setUser(response.data.token);
        setUserId(response.data.data);
        // console.log("User ID after login:", response.data.data); // Log the user ID after login
        if (response.data.data) {
          await fetchReviews(response.data.data);
        } else {
          console.error("No userId found after login.");
        }
        return response.data;
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (reviewerId) => {
    setLoading(true);
    try {
      if (!reviewerId) {
        console.error("Reviewer ID is null or undefined."); // Log if reviewerId is missing
        return;
      }

      // console.log("Fetching reviews for reviewer ID:", reviewerId); // Log before fetching reviews
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_MAIN_API_LINK
        }/api/reviewer/reviewerReviews/${reviewerId.reviewerId}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`, // Include the token in the headers
          },
        }
      );
      // console.log("Reviews fetched:", response.data); // Log the fetched reviews
      setReviews(Array.isArray(response.data.data) ? response.data.data : []); // Ensure reviews is an array
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewerDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_MAIN_API_LINK}/api/reviewer/getreviewer/1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`, // Include the token in the headers
          },
        }
      );
      // console.log("Reviewer details fetched:", response.data); // Log the fetched reviewer details
      setReviewerDetails(response.data);
    } catch (error) {
      console.error("Error fetching reviewer details:", error);
      if (error.response && error.response.status === 403) {
        console.error("Forbidden: You don't have access to this resource.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    setReviews([]);
    setReviewerDetails(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        loading,
        reviews,
        reviewerDetails,
        register,
        login,
        logout,
        fetchReviewerDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
