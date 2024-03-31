import { NgxsModule, Store } from '@ngxs/store';
import { VariantsState, VariantsStateModel } from './variants.state';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { VariantService } from '../variant.service';
import { generateVariant, generateVariantBatch } from '../domain/variant.factory';
import { FilterVariantsRequest, LoadVariantBatchRequest } from './variants.actions';

describe('Variant state actions', () => {
  let store: Store;
  let state: VariantsState;
  let apiService: VariantService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([VariantsState])],
      providers: [VariantService]
    }).compileComponents();
    store = TestBed.inject(Store);
    state = TestBed.inject(VariantsState);
    apiService = TestBed.inject(VariantService);
  }));

  it('should initialize store', () => {
    expect(store).toBeDefined();
  });

  it('should load variant batch', async () => {
    const mockBatchSize = 10;
    const mockVariants = generateVariantBatch(mockBatchSize);
    
    jest.spyOn(apiService, 'loadVariantBatch').mockReturnValue(mockVariants);

    await store.dispatch(new LoadVariantBatchRequest(mockBatchSize))

    const currentState = store.snapshot().variants as VariantsStateModel;
    expect(currentState.variants).toEqual(mockVariants);
    expect(currentState.filteredVariants).toEqual(mockVariants);
    expect(currentState.searchTerm).toEqual('');
  });

  it('should filter variants correctly', async () => {
    const shouldBeFiltered =  generateVariant("Variant Filtered");
    const shouldNotBeFiltered = generateVariant("Variant Other");
    jest.spyOn(apiService, 'loadVariantBatch').mockReturnValue([
      shouldBeFiltered,
      shouldNotBeFiltered
    ]);
    await store.dispatch(new LoadVariantBatchRequest(1));

    await store.dispatch(new FilterVariantsRequest("Filtered"));

    const currentState = store.snapshot().variants as VariantsStateModel;
    expect(currentState.searchTerm).toEqual("Filtered");
    expect(currentState.filteredVariants).toEqual([
        shouldBeFiltered
    ]);
    expect(currentState.variants).toEqual([
      shouldBeFiltered,
      shouldNotBeFiltered
    ])
  });
});
