import { useRouter } from "next/router";

const userTypeColorConfig: Record<string, string> = {
  staff: "#5E7BEC",
  customer: "#00A48A",
  supplier: "#F2C901",
  superuser: "#505050",
};

const useUserTypeFinder = () => {
  const slug = useRouter();
  const userType = slug.pathname.split("/")[1];
  return { userType, userColorConfig: userTypeColorConfig[userType] };
};

export default useUserTypeFinder;
