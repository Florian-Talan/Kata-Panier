interface PathDef {
  relative: string;
  absolute: string;
}

interface PathList {
  produit: PathDef;
  panier: PathDef;
}

const produitPath = 'produit';
const pannierPath = 'panier';

export const path: PathList = {
  produit: {
    relative: produitPath,
    absolute: '/' + produitPath,
  },
  panier: {
    relative: pannierPath,
    absolute: '/' + pannierPath,
  },
};
