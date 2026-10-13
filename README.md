# LapseCoin website

The site for [LapseCoin](https://github.com/Lapsecoin/core), served by GitHub Pages from the root of `main`:
https://lapsecoin.github.io/Lapsecoin/

Pages are written in `pages/`. `build.py` adds the shared head, navigation and footer and writes the `.html` files in the root. Run it after any edit:

```
python build.py          # write the pages
python build.py --check  # fail if they are out of date
```

Edit `pages/` for content and `build.py` for anything shared. Do not edit the generated `.html` files.
