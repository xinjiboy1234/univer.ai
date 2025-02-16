import type { IWorkbookData } from '@univerjs/core'
import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import type { IUniverRPCMainThreadConfig } from '@univerjs/rpc'
import { UniverRPCMainThreadPlugin } from '@univerjs/rpc'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { UniverUIPlugin } from '@univerjs/ui'
import { enUS, zhCN } from 'univer:locales'
import { ExchangeClientPlugin } from '../../exchange-plugin'

export function createUniver(workbookData: IWorkbookData) {
  const univer = new Univer({
    theme: defaultTheme,
    locale: LocaleType.EN_US,
    locales: {
      [LocaleType.EN_US]: enUS,
      [LocaleType.ZH_CN]: zhCN,
    },
  })

  univer.registerPlugin(UniverDocsPlugin)
  univer.registerPlugin(UniverDocsUIPlugin)
  univer.registerPlugin(UniverFormulaEnginePlugin)
  univer.registerPlugin(UniverRenderEnginePlugin)
  univer.registerPlugin(UniverUIPlugin, {
    container: 'app',
  })

  // sheet basic plugins
  univer.registerPlugin(UniverSheetsNumfmtPlugin)
  univer.registerPlugin(UniverSheetsPlugin, {
    notExecuteFormula: true, // using web worker
  })
  univer.registerPlugin(UniverSheetsUIPlugin)
  univer.registerPlugin(UniverSheetsFormulaPlugin)
  univer.registerPlugin(UniverSheetsZenEditorPlugin)

  // web worker
  univer.registerPlugin(UniverRPCMainThreadPlugin, {
    workerURL: './worker.js',
  } as IUniverRPCMainThreadConfig)

  univer.registerPlugin(ExchangeClientPlugin)

  univer.createUnit(UniverInstanceType.UNIVER_SHEET, workbookData)
}
