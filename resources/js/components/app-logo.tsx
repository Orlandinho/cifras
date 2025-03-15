import { FileMusicIcon } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                {/*<AppLogoIcon className="size-5 fill-current text-white dark:text-black" />*/}
                <FileMusicIcon className="size-5 text-white dark:text-neutral-900" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Exaltai Cifras</span>
            </div>
        </>
    );
}
