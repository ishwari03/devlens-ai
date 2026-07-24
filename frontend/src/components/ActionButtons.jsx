import {
  Sparkles,
  SearchCheck,
  Wrench,
  Bug,
  Zap,
  Loader2,
} from "lucide-react";

const actions = [
  {
    label: "Explain",
    icon: Sparkles,
    action: "explain",
  },
  {
    label: "Review",
    icon: SearchCheck,
    action: "review",
  },
  {
    label: "Fix",
    icon: Wrench,
    action: "fix",
  },
  {
    label: "Optimize",
    icon: Zap,
    action: "optimize",
  },
  {
    label: "Bugs",
    icon: Bug,
    action: "bugs",
  },
];

function ActionButtons({
  loading,
  handleAction,
  activeAction,
}) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-2
        p-3

        sm:grid-cols-3
        sm:gap-3
        sm:p-4

        lg:grid-cols-5
        lg:gap-3
        lg:p-5
      "
    >
      {actions.map(({ label, icon: Icon, action }) => {
        const isActive = activeAction === action;
        const isLoading = loading && isActive;

        return (
          <button
            key={action}
            disabled={loading}
            onClick={() => handleAction(action)}
            className={`
              group
              flex
              items-center
              justify-center
              gap-2

              rounded-xl
              border

              px-3
              py-3

              transition-all
              duration-200

              ${
                isActive
                  ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700 hover:text-white"
              }

              disabled:cursor-not-allowed
              disabled:opacity-70
            `}
          >
            {isLoading ? (
              <Loader2
                size={18}
                className="animate-spin shrink-0"
              />
            ) : (
              <Icon
                size={18}
                className="shrink-0 transition-transform duration-200 group-hover:scale-110"
              />
            )}

            <span
              className="
                text-xs
                font-medium

                sm:text-sm
              "
            >
              {isLoading ? "Running..." : label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ActionButtons;