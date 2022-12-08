import { useEffect } from "react"

export const useMount = (callback: React.EffectCallback) => useEffect(callback, [])
