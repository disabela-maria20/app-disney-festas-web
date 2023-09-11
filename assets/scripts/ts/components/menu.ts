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

export function Menu() {
  const getMenu = async (): Promise<void> => {
    try {
      const res = await fetch('http://disney.local/wp-json/api/v1/menu');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`Erro na solicitação: ${res.status}`);
      } else {
        viewMenu(data);
      }

    } catch (error) {
      console.error(`Erro ao buscar a imagem: ${error.message}`);
    }
  }

  getMenu();

  const viewMenu = (data: MenuData): void => {
    const menu = document.querySelector("#area_menu");


    const link = data[0].logo;
    const items = data[0].item;

    menu.innerHTML += `
      <div class="area_logo">
        <img src="${link}" alt="logo"/>
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav>
        <ul>
          ${items.map((item: Item) => `
            <li>
              <a href="${item.link}">${item.nome}</a>
              ${item.sub_item && item.sub_item.length > 0 ? `
                <ul>
                  ${item.sub_item.map((subItem: SubItem) => `
                    <li>
                      <a href="${subItem.sub_item_link}">${subItem.sub_item_nome}</a>
                    </li>
                  `).join('')}
                </ul>
              ` : ''}
            </li>
          `).join('')}
        </ul>
      </nav>
    `;
  };
}
