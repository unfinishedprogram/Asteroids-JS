export function proxyClass<T> () : new () => Pick<T, keyof T> {
	return class {} as any
}