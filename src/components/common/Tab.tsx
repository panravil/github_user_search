import { Link, useLocation } from "react-router-dom";

export type TabProps = {
  elements: {
    caption: string;
    url: string;
  }[];
};

export const Tab = ({ elements }: TabProps) => {
  const { pathname } = useLocation();

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {elements.map((element, index) => (
          <li className="mr-2" key={index}>
            <Link to={element.url}>
              <h5
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                  pathname === element.url
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {element.caption}
              </h5>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
