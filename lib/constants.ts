import {
    BuildingIcon,
    CableCarIcon,
    CastleIcon,
    DropletOffIcon,
    GemIcon,
    GuitarIcon,
    MagnetIcon,
    MountainIcon,
    SailboatIcon,
    SnowflakeIcon,
    TentIcon,
    TreePalmIcon,
    VolleyballIcon,
    WavesLadderIcon,
    WindIcon,
} from 'lucide-react'
import { categortyT, CATEGORY } from './types'

export const categories: categortyT[] = [
    {
        label: CATEGORY.Beach,
        Icon: VolleyballIcon,
        description: 'This property is close to the beach!',
    },
    {
        label: CATEGORY.Windmills,
        Icon: WindIcon,
        description: 'This property is has windmills!',
    },
    {
        label: CATEGORY.Modern,
        Icon: BuildingIcon,
        description: 'This property is modern!',
    },
    {
        label: CATEGORY.Countryside,
        Icon: GuitarIcon,
        description: 'This property is in the countryside!',
    },
    {
        label: CATEGORY.Pools,
        Icon: WavesLadderIcon,
        description: 'This is property has a beautiful pool!',
    },
    {
        label: CATEGORY.Islands,
        Icon: TreePalmIcon,
        description: 'This property is on an island!',
    },
    {
        label: CATEGORY.Lake,
        Icon: SailboatIcon,
        description: 'This property is near a lake!',
    },
    {
        label: CATEGORY.Skiing,
        Icon: CableCarIcon,
        description: 'This property has skiing activies!',
    },
    {
        label: CATEGORY.Castles,
        Icon: CastleIcon,
        description: 'This property is an ancient castle!',
    },
    {
        label: CATEGORY.Caves,
        Icon: MountainIcon,
        description: 'This property is in a spooky cave!',
    },
    {
        label: CATEGORY.Camping,
        Icon: TentIcon,
        description: 'This property offers camping activities!',
    },
    {
        label: CATEGORY.Arctic,
        Icon: SnowflakeIcon,
        description: 'This property is in arctic environment!',
    },
    {
        label: CATEGORY.Desert,
        Icon: DropletOffIcon,
        description: 'This property is in the desert!',
    },
    {
        label: CATEGORY.Barns,
        Icon: MagnetIcon,
        description: 'This property is in a barn!',
    },
    {
        label: CATEGORY.Lux,
        Icon: GemIcon,
        description: 'This property is brand new and luxurious!',
    },
]
