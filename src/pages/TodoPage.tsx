import { useTranslation } from "react-i18next";

const TodoPage = () => {
  const { t } = useTranslation(); // Use "todo" namespace

  return (
    <div className="flex justify-center h-screen items-center bg-gradient-to-r from-blue-500 to-slate-300">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 animate-pulse">
          {t("todo.comingSoon")}
        </h1>
        <p className="text-lg sm:text-xl text-white opacity-80">
          {t("todo.workingHard")}
        </p>
      </div>
    </div>
  );
};

export default TodoPage;
