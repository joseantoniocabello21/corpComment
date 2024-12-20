import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";
import { API_URL } from "../lib/constants";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (text: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },
  getFilteredFeedbackItems: () => {
    return get().selectedCompany
      ? get().feedbackItems.filter(
          (item) => item.company === get().selectedCompany
        )
      : get().feedbackItems;
  },
  addItemToList: async (text: string) => {
    const company = text
      .split(" ")
      .find((word: string) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      company,
      badgeLetter: company.substring(0, 1).toUpperCase(),
    };

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

    //setFeedbackItems([...feedbackItems, newItem]);

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newItem),
    });
  },
  selectCompany: (text: string) => {
    set(() => ({ selectedCompany: text }));
    //setSelectedCompany(text);
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
    }));
    //setIsLoading(true);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("QUEE");
      }

      const data = await response.json();

      set(() => ({
        feedbackItems: data.feedbacks,
      }));

      //setFeedbackItems(data.feedbacks);
    } catch (error) {
      set(() => ({
        errorMessage: "Something wrong with the call",
      }));
      //setErrorMessage("Something wrong with the call");
    }
    set(() => ({
      isLoading: false,
    }));
    //setIsLoading(false);
  },
}));
