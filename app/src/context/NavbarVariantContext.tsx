"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Variant = "light" | "dark";

const NavbarVariantContext = createContext<{
  variant: Variant;
  setVariant: (v: Variant) => void;
}>({
  variant: "light",
  setVariant: () => {},
});

export function NavbarVariantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [variant, setVariant] = useState<Variant>("light");

  return (
    <NavbarVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </NavbarVariantContext.Provider>
  );
}

export const useNavbarVariant = () => useContext(NavbarVariantContext);

export function SetNavbarVariant({ variant }: { variant: Variant }) {
  const { setVariant } = useNavbarVariant();

  useEffect(() => {
    setVariant(variant);
    return () => setVariant("light");
  }, [variant, setVariant]);

  return null;
}