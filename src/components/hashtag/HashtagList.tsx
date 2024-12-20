//import { useFeedbackItemsContext } from "../../lib/hooks";
import { useFeedbackItemsStore } from "../../stores/feedbackItemStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
  //const { companyList, handleSelectedCompany } = useFeedbackItemsContext();
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onSelectCompany={selectCompany}
        />
      ))}
    </ul>
  );
}