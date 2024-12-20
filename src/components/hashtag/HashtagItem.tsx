type HashtagItemProps = {
  company: string;
  onSelectCompany: (text: string) => void;
};

export default function HashtagItem({
  company,
  onSelectCompany,
}: HashtagItemProps) {
  return (
    <li>
      <button
        onClick={() => {
          onSelectCompany(company);
        }}
      >
        #{company}
      </button>
    </li>
  );
}
