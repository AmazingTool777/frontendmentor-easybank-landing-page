import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";
import postCSSSortMediaQueries from "postcss-sort-media-queries";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    purgeCSSPlugin({
      content: ["./**/*.html"],
      extractors: [
        {
          extractor: (content) => {
            return content.match(/[A-z0-9-:\/]+/g);
          },
          extensions: ["html"],
        },
      ],
      safelist: [
        "shadowed",
        "navbar-menu-overlay",
        "enter",
        "enter-from",
        "enter-to",
        "leave",
        "leave-from",
        "leave-to",
      ],
    }),
    postCSSSortMediaQueries(),
    autoprefixer(),
  ],
};
