type SubItem = {
  sub_item_nome: string;
  sub_item_link: string;
};

type Item = {
  nome: string;
  link: string;
  sub_item: SubItem[];
};

type MenuData = {
  item: Item[];
  logo: string;
};
