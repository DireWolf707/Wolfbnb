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
import { categortyListT } from './types'

export const MAX_FILESIZE = 3 * 1024 * 1024

export const categories: categortyListT[] = [
    {
        label: 'Beach',
        Icon: VolleyballIcon,
        description: 'This property is close to the beach!',
    },
    {
        label: 'Windmills',
        Icon: WindIcon,
        description: 'This property is has windmills!',
    },
    {
        label: 'Modern',
        Icon: BuildingIcon,
        description: 'This property is modern!',
    },
    {
        label: 'Countryside',
        Icon: GuitarIcon,
        description: 'This property is in the countryside!',
    },
    {
        label: 'Pools',
        Icon: WavesLadderIcon,
        description: 'This is property has a beautiful pool!',
    },
    {
        label: 'Islands',
        Icon: TreePalmIcon,
        description: 'This property is on an island!',
    },
    {
        label: 'Lake',
        Icon: SailboatIcon,
        description: 'This property is near a lake!',
    },
    {
        label: 'Skiing',
        Icon: CableCarIcon,
        description: 'This property has skiing activies!',
    },
    {
        label: 'Castles',
        Icon: CastleIcon,
        description: 'This property is an ancient castle!',
    },
    {
        label: 'Caves',
        Icon: MountainIcon,
        description: 'This property is in a spooky cave!',
    },
    {
        label: 'Camping',
        Icon: TentIcon,
        description: 'This property offers camping activities!',
    },
    {
        label: 'Arctic',
        Icon: SnowflakeIcon,
        description: 'This property is in arctic environment!',
    },
    {
        label: 'Desert',
        Icon: DropletOffIcon,
        description: 'This property is in the desert!',
    },
    {
        label: 'Barns',
        Icon: MagnetIcon,
        description: 'This property is in a barn!',
    },
    {
        label: 'Lux',
        Icon: GemIcon,
        description: 'This property is brand new and luxurious!',
    },
]
