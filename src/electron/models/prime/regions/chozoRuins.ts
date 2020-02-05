import { RegionObject } from '../../region';
import { PrimeItem } from '../../../enums/primeItem';
import { PrimeLocation } from '../../../enums/primeLocation';
import { PrimeItemCollection } from '../itemCollection';
import { PrimeRandomizerSettings } from '../randomizerSettings';

export function chozoRuins(): RegionObject[] {
  const regions: RegionObject[] = [
    {
      name: 'Chozo West',
      locations: {
        [PrimeLocation.MAIN_PLAZA_HALF_PIPE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = settings.tricks.mainPlazaItemsOnlySpaceJump && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          return sjReqs || items.canBoost();
        },
        [PrimeLocation.MAIN_PLAZA_GRAPPLE_LEDGE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = settings.tricks.mainPlazaItemsOnlySpaceJump && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          return sjReqs || items.has(PrimeItem.GRAPPLE_BEAM)
        },
        [PrimeLocation.MAIN_PLAZA_TREE]: (items: PrimeItemCollection) => items.canFireSuperMissiles(),
        [PrimeLocation.MAIN_PLAZA_LOCKED_DOOR]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = settings.tricks.mainPlazaItemsOnlySpaceJump && items.has(PrimeItem.SPACE_JUMP_BOOTS);
          return sjReqs || (items.hasMissiles() && items.has(PrimeItem.MORPH_BALL));
        },
        [PrimeLocation.RUINED_NURSERY]: (items: PrimeItemCollection) => items.canLayBombs(),
        [PrimeLocation.RUINED_GALLERY_MISSILE_WALL]: (items: PrimeItemCollection) => items.hasMissiles(),
        [PrimeLocation.RUINED_GALLERY_TUNNEL]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return canBoost || items.canLayBombs();
        },
        [PrimeLocation.HIVE_TOTEM]: () => true, // first expected item in glitchless logic
        [PrimeLocation.TRANSPORT_ACCESS_NORTH]: (items: PrimeItemCollection) => items.hasMissiles()
      },
      exits: {
        'Chozo Ruined Shrine': (items: PrimeItemCollection) => items.hasMissiles(),
        'Chozo Ruined Fountain': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        'Chozo Transport West': () => true,
        'Chozo Transport North': (items: PrimeItemCollection) => items.hasMissiles() && items.has(PrimeItem.MORPH_BALL)
      }
    },
    {
      name: 'Chozo Ruined Shrine',
      locations: {
        [PrimeLocation.RUINED_SHRINE_BEETLE_BATTLE]: () => true,
        [PrimeLocation.RUINED_SHRINE_HALF_PIPE]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const sjReqs = settings.tricks.upperRuinedShrineTowerOfLightFewerAccessReqs
            && items.has(PrimeItem.SPACE_JUMP_BOOTS) && items.has(PrimeItem.MORPH_BALL);
          return sjReqs || items.canBoost();
        },
        [PrimeLocation.RUINED_SHRINE_LOWER_TUNNEL]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Chozo West': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL) || items.has(PrimeItem.SPACE_JUMP_BOOTS),
        'Chozo Tower of Light': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const accessReqs = settings.tricks.upperRuinedShrineTowerOfLightFewerAccessReqs
            || (items.canLayBombs() && items.canBoost() && items.canSpider());
          return accessReqs && items.has(PrimeItem.WAVE_BEAM) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        }
      }
    },
    {
      name: 'Chozo Tower of Light',
      locations: {
        [PrimeLocation.TOWER_OF_LIGHT]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          return settings.tricks.climbTowerOfLightNoMissiles || items.hasMissileCount(8)
        },
        [PrimeLocation.TOWER_CHAMBER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          return settings.tricks.towerChamberNoGravity || items.has(PrimeItem.GRAVITY_SUIT)
        }
      },
      exits: {
        'Chozo Ruined Shrine': () => true,
      }
    },
    {
      name: 'Chozo Ruined Fountain',
      locations: {
        [PrimeLocation.RUINED_FOUNTAIN]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const flaahgraSkipReq = settings.tricks.ruinedFountainFlaahgraSkip || items.canLayBombs();
          return flaahgraSkipReq && items.canSpider();
        }
      },
      exits: {
        'Chozo West': () => true,
        'Chozo Central': (items: PrimeItemCollection) => items.hasMissiles(),
        'Chozo Training Area': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const grappleReq = settings.tricks.magmaPoolDash || items.has(PrimeItem.GRAPPLE_BEAM);
          return grappleReq && items.hasSuit(settings);
        }
      }
    },
    {
      name: 'Chozo Training Area',
      locations: {
        [PrimeLocation.MAGMA_POOL]: (items: PrimeItemCollection) => items.canLayPowerBombs(),
        [PrimeLocation.TRAINING_CHAMBER_ACCESS]: (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM),
        [PrimeLocation.TRAINING_CHAMBER]: (items: PrimeItemCollection) =>
          items.canFireSuperMissiles() && items.canLayBombs() && items.canBoost() && items.canSpider() && items.has(PrimeItem.WAVE_BEAM)
      },
      exits: {
        'Chozo Ruined Fountain': () => true,
        'Chozo West': (items: PrimeItemCollection) => items.canFireSuperMissiles() && items.canLayBombs()
      }
    },
    {
      name: 'Chozo Central',
      locations: {
        [PrimeLocation.WATERY_HALL_ACCESS]: () => true,
        [PrimeLocation.WATERY_HALL_SCAN_PUZZLE]: () => true,
        [PrimeLocation.WATERY_HALL_UNDERWATER]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const flaahgraSkipReq = settings.tricks.wateryHallUnderwaterFlaahgraSkip || items.canLayBombs();
          return flaahgraSkipReq && items.has(PrimeItem.GRAVITY_SUIT) && items.has(PrimeItem.SPACE_JUMP_BOOTS)
        },
        [PrimeLocation.GATHERING_HALL]: (items: PrimeItemCollection) => items.canLayBombs() && items.has(PrimeItem.SPACE_JUMP_BOOTS),
        [PrimeLocation.FURNACE_TUNNEL]: (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return canBoost || items.canLayBombs();
        }
      },
      exits: {
        'Chozo Ruined Fountain': () => true,
        'Chozo Burn Dome': () => true,
        'Chozo Dynamo': (items: PrimeItemCollection) => items.canLayBombsOrPowerBombs(),
        'Chozo Furnace': (items: PrimeItemCollection, settings: PrimeRandomizerSettings) => {
          const spiderReqs = (settings.tricks.furnaceAccessWithoutSpider && items.has(PrimeItem.MORPH_BALL)) || items.canSpider();
          const canBoost = settings.tricks.boostThroughBombTunnels && items.canBoost();
          return spiderReqs && (canBoost || items.canLayBombs());
        },
        'Chozo Sunchamber': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Chozo Burn Dome',
      locations: {
        [PrimeLocation.BURN_DOME_I_DRONE]: () => true,
        [PrimeLocation.BURN_DOME_TUNNEL]: (items: PrimeItemCollection) => items.canLayBombs()
      },
      exits: {
        'Chozo Central': (items: PrimeItemCollection) => items.canLayBombs()
      }
    },
    {
      name: 'Chozo Dynamo',
      locations: {
        [PrimeLocation.DYNAMO_LOWER]: () => true,
        [PrimeLocation.DYNAMO_SPIDER_TRACK]: (items: PrimeItemCollection) => items.canSpider(),
      },
      exits: {
        'Chozo Central': () => true
      }
    },
    {
      name: 'Chozo Vault',
      locations: {
        [PrimeLocation.VAULT]: (items: PrimeItemCollection) => items.canLayBombs(),
      },
      exits: {
        'Chozo West': () => true,
        'Chozo Transport North': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
      }
    },
    {
      name: 'Chozo Sunchamber',
      locations: {
        [PrimeLocation.SUNCHAMBER_FLAAHGRA]: () => true,
        [PrimeLocation.SUNCHAMBER_GHOSTS]: () => true // randomprime patches out the vines allowing for quick return visit
      },
      exits: {
        'Chozo Transport North': () => true,
        'Chozo Central': (items: PrimeItemCollection) => items.canLayBombs() // probably not needed but doesn't hurt
      }
    },
    {
      name: 'Chozo Furnace',
      locations: {
        [PrimeLocation.FURNACE_SPIDER_TRACKS]: (items: PrimeItemCollection) => items.canBoost() && items.canSpider() && items.canLayPowerBombs()
      },
      exits: {
        'Chozo Central': (items: PrimeItemCollection) => items.canLayBombs(),
        'Chozo Crossway': (items: PrimeItemCollection) => items.has(PrimeItem.WAVE_BEAM),
        'Chozo Hall of the Elders': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Chozo Crossway',
      locations: {
        [PrimeLocation.CROSSWAY]: (items: PrimeItemCollection) => items.canBoost() && items.canSpider() && items.canFireSuperMissiles(),
      },
      exits: {
        'Chozo Furnace': () => true,
        'Chozo Hall of the Elders': (items: PrimeItemCollection) => (items.hasMissiles() && items.canBoost()) || items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Chozo Hall of the Elders',
      locations: {
        [PrimeLocation.HALL_OF_THE_ELDERS]: (items: PrimeItemCollection) => items.canSpider() && items.has(PrimeItem.ICE_BEAM),
        [PrimeLocation.ELDER_CHAMBER]: (items: PrimeItemCollection) =>
          items.canSpider() && items.has(PrimeItem.ICE_BEAM) && items.has(PrimeItem.PLASMA_BEAM)
      },
      exits: {
        'Chozo Furnace': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM),
        'Chozo Crossway': (items: PrimeItemCollection) => items.hasMissiles(),
        'Chozo Reflecting Pool': (items: PrimeItemCollection) => items.canSpider() && items.has(PrimeItem.WAVE_BEAM)
      }
    },
    {
      name: 'Chozo Reflecting Pool',
      locations: {
      },
      exits: {
        'Chozo Hall of the Elders': () => true,
        'Chozo Antechamber': (items: PrimeItemCollection) => items.canBoost(),
        'Chozo Transport East': (items: PrimeItemCollection) => items.canBoost() && items.has(PrimeItem.ICE_BEAM),
        'Chozo Transport South': (items: PrimeItemCollection) => items.canBoost() && items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Chozo Antechamber',
      locations: {
        [PrimeLocation.ANTECHAMBER]: () => true
      },
      exits: {
        'Chozo Reflecting Pool': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM),
      }
    },
    {
      name: 'Chozo Transport West',
      exits: {
        'Tallon Transport North': () => true,
        'Chozo West': () => true
      }
    },
    {
      name: 'Chozo Transport North',
      exits: {
        'Magmoor Transport North': () => true,
        'Chozo West': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs(),
        'Chozo Vault': (items: PrimeItemCollection) => items.has(PrimeItem.MORPH_BALL),
        'Chozo Sunchamber': (items: PrimeItemCollection) => items.canLayBombs() && items.canSpider() && items.canFireSuperMissiles()
      }
    },
    {
      name: 'Chozo Transport East',
      exits: {
        'Tallon Transport East': () => true,
        'Chozo Reflecting Pool': (items: PrimeItemCollection) => items.hasMissiles() && items.canLayBombs() && items.has(PrimeItem.ICE_BEAM)
      }
    },
    {
      name: 'Chozo Transport South',
      exits: {
        'Tallon Transport South (Chozo)': () => true,
        'Chozo Reflecting Pool': (items: PrimeItemCollection) => items.has(PrimeItem.ICE_BEAM)
      }
    }
  ];

  return regions;
};
