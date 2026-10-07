import { notFound } from "next/navigation";
import Dish, { type DishKind } from "@/components/demos/art/Dish";
import Jewel, { type JewelKind } from "@/components/demos/art/Jewel";
import Hair, { type HairStyle } from "@/components/demos/art/Hair";
import Dental, { type DentalKind } from "@/components/demos/art/Dental";
import Truck, { type TruckKind } from "@/components/demos/art/Truck";

// Página de USO INTERNO para revisar as ilustrações. Em produção responde 404 (a pasta pode ser apagada).
const dishes: DishKind[] = ["risoto", "file", "salmao", "burrata", "carpaccio", "petit", "tiramisu", "negroni", "suco"];
const jewels: JewelKind[] = ["ring", "bands", "necklace", "earrings", "bracelet", "pearls"];
const hairs: HairStyle[] = ["fade", "pompadour", "social", "curly", "long", "beard", "buzz", "bun"];
const dentals: DentalKind[] = ["smile", "tooth", "braces", "implant", "clean", "aligner"];
const trucks: TruckKind[] = ["van", "box", "semi"];

export default function Arte() {
  if (process.env.NODE_ENV === "production") notFound();
  const row = "grid gap-4 grid-cols-3 md:grid-cols-6";
  return (
    <div className="bg-[#20242e] p-6 text-white">
      <h2 className="mb-2">Pratos</h2>
      <div className={row}>{dishes.map((k) => <div key={k} className="bg-[#2a1c16] p-2"><Dish kind={k} /><p className="text-xs">{k}</p></div>)}</div>
      <h2 className="mb-2 mt-6">Joias</h2>
      <div className={row}>
        {jewels.map((k, i) => <div key={k} className="bg-[#16130f] p-2"><Jewel kind={k} gem={(["diamond", "emerald", "ruby", "sapphire"] as const)[i % 4]} metal={(["gold", "rose", "silver"] as const)[i % 3]} /><p className="text-xs">{k}</p></div>)}
      </div>
      <h2 className="mb-2 mt-6">Cabelos</h2>
      <div className={row}>
        {hairs.map((k, i) => <div key={k} className="bg-[#3a3326] p-2"><Hair style={k} skin={["#e8b896", "#c68642", "#8d5524", "#f1c9a5"][i % 4]} hair={["#2b1d16", "#6b4423", "#111", "#8b5a2b"][i % 4]} /><p className="text-xs">{k}</p></div>)}
        <div className="bg-[#e8f4f4] p-2"><Hair style="long" outfit="coat" outfitColor="#f4f8fb" hair="#4a2c1d" skin="#f1c9a5" /></div>
        <div className="bg-[#e8f4f4] p-2"><Hair style="social" outfit="coat" outfitColor="#f4f8fb" beard /></div>
      </div>
      <h2 className="mb-2 mt-6">Odonto</h2>
      <div className={row}>{dentals.map((k) => <div key={k} className="bg-[#e8f6f6] p-2 text-black"><Dental kind={k} /><p className="text-xs">{k}</p></div>)}<div className="bg-[#e8f6f6] p-2"><Dental kind="smile" shade="#e6d98f" /></div></div>
      <h2 className="mb-2 mt-6">Caminhões</h2>
      <div className="grid gap-4 md:grid-cols-3">{trucks.map((k) => <div key={k} className="bg-[#0b1f3a] p-2"><Truck kind={k} /></div>)}</div>
    </div>
  );
}
