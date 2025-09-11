(() =>{
    const STORAGE_KEY = 'dulces_delicias_v1';

    const initialState = {
        profile: {nombre: '', email: '', prefs: []},
        cart: [],//{id, name, cantidad, subtotal, profile} 
        reviews: [],//{tipo_torta, rating, comentario,fecha, profile}
        orders: []//{id, items: [], total, fecha, profile}
    };

    const localStage = () => {
        try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) ||{... initialState}; }
        catch { return {... initialState};}
    }
    
    const saveState =() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        
    let state = loadState();

    // Helpers DOM
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    /*Router por hash*/
    const sections = () => $$('main sections');
    const showSection =  (hash) => {
<<<<<<< HEAD
        const target = hash ?.replace('#', '') || 'home';
=======
        const target = hash ?.replace('#', '') || 'home';}
>>>>>>> fbb5cda317780cd93f71266b5c7b1402bcbe1e96
        sections().forEach (sec => { 
            const id = sec.getAttribute('id');
            sec.style.display = (id === target) ? '' : 'none';
        });
<<<<<<< HEAD
    }; 
    window.addEventListener('hashchange', () => showSection(location.hash));
    document.addEventListener('DOMcontentLoaded' , () => showSection(location.hash));

    /*Perfil*/
    const bindProfile = () => {
        const form = $('#perfil form[aria-label = "Perfil"]') || $('perfil form(data-screen=perfil)');
        if (!form) return; 

        // Inicializar valores 
        $('#nombre', form);
    };
    

=======
    };
    
>>>>>>> fbb5cda317780cd93f71266b5c7b1402bcbe1e96
})