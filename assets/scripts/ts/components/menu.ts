
export function Menu() {
  async function fetchMenuData(): Promise<MenuData> {
    const res = await fetch('https://disney.isabelamribeiro.com.br/wp-json/api/v1/menu');
    if (!res.ok) {
      throw new Error(`Erro na solicitação: ${res.status}`);
    }
    return res.json();
  }

  function renderMenu(menuData: MenuData): void {
    const menu = document.querySelector("#area_menu");
    const link = menuData[0].logo_path;
    const items = menuData[0].item;

    menu.innerHTML += `
      <div class="area_logo">
        <img src="${link}" alt="logo"/>
        <div class="menu-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav class="menu">
        <ul>
          ${items.map(renderMenuItem).join('')}
        </ul>
      </nav>
    `;

    initializeMenu();
  }

  function renderMenuItem(item: Item): string {
    return `
      <li>
        <a href="${item.link}">${item.nome}</a>
        ${item.sub_item && item.sub_item.length > 0 ? `
          <ul>
            ${item.sub_item.map(renderSubItem).join('')}
          </ul>
        ` : ''}
      </li>
    `;
  }

  function renderSubItem(subItem: SubItem): string {
    return `
      <li>
        <a href="${subItem.sub_item_link}">${subItem.sub_item_nome}</a>
      </li>
    `;
  }

  function initializeMenu(): void {
    document.querySelector(".menu-burger").addEventListener("click", () => {
      document.querySelectorAll('.menu-burger span').forEach((item) => {
        item.classList.toggle('active')
      });
      document.querySelector('.menu').classList.toggle('active');
    })
  
  }

  async function Menus() {
    try {
      const menuData = await fetchMenuData();
      renderMenu(menuData);
    } catch (error) {
      console.error(`Erro ao buscar a imagem: ${error.message}`);
    }
  }

  // Chamar a função Menus() para iniciar o processo
  Menus();

}
