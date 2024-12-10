import { useNavigate } from "react-router";

type Props = {
  path?: string;
};

export const BackButton: React.FC<Props> = ({ path }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => (path ? navigate(path) : navigate(-1))}>
      &lt; Back
    </button>
  );
};
