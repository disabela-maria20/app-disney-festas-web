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
  const getMenu = async (): Promise<void> =>  {
    try {
      const res = await fetch('http://disney.local/wp-json/api/v1/menu');
      const data = await res.json();


      if (!res.ok) {
        throw new Error(`Erro na solicitação: ${res.status}`);
      }else{
      console.log('====================================');
      console.log(data);
      console.log('====================================');
        viewMenu(data);
      }

    } catch (error) {
      console.error(`Erro ao buscar a imagem: ${error.message}`);
    }
  } 

  getMenu();
  
  const viewMenu = (data:MenuData): void => {
    const menu = document.querySelector("#area_menu");
    const links = data[0].item

    for  (const link of links) {
      console.log('====================================');
      console.log(link);
      console.log('====================================');
    }
    menu.innerHTML += `
    `

   
  };
  
 
}
