import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import { TFeedbackItem } from "./types";
import { API_URL } from "./constants";

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);

  if (!context) {
    throw new Error("Developer problem. Check context Scope");
  }
  return context;
}

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("QUEE");
        }

        const data = await response.json();

        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something wrong with the call");
      }
      setIsLoading(false);
    };

    fetchFeedbackItems();

    //NATIVE FETCH WAY
    // setIsLoading(true);
    // fetch(
    //   "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("QUEE");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data.feedbacks);
    //     setFeedbackItems(data.feedbacks);
    //     setIsLoading(false);
    //   })
    //   .catch(() => {
    //     setErrorMessage("Something is wrong in the call");
    //     setIsLoading(false);
    //   });
  }, []);

  return { feedbackItems, isLoading, errorMessage, setFeedbackItems };
}
